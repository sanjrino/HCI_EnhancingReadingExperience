import os  # Add this line to import the os module
from flask import Flask, render_template, jsonify

app = Flask(__name__)

@app.route('/')
def index():
    return render_template('Store.html')

# Define a route for the favicon.ico request
@app.route('/favicon.ico')
def favicon():
    return '', 204

@app.route('/move_book/<book_name>')
def move_book(book_name):
    try:
        source_path = f'./templates/StoreBooks/{book_name}.html'
        destination_path = f'./templates/LibraryBooks/{book_name}.html'

        os.rename(source_path, destination_path)

        return jsonify({'success': True, 'message': f'Moved {book_name} to LibraryBooks'})
    except Exception as e:
        return jsonify({'success': False, 'message': str(e)})

if __name__ == '__main__':
    app.run(debug=True)
