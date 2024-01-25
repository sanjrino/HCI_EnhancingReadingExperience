HCI project about enchancing reading experience.

---------------------------------------------------------------------------------------------------------------------------------------------------------------------

Some talking:

Original idea was to use UnrealEngine 5 to create scenes with books to read in vr, while enjoying the immersive scenery. My hardware did not agree, so we had to scrap the idea (The requirements to run Unreal and VR are LinusTechTip levels).

Lower demanding system was required. After analising current state of vr websites, I decided to go with a-frames to provide a nice and 3d look to it. It resulted in input problems (did not accept VR clicks, or pc clicks...) so I reserved a-frames and 3D only for the book page, where less logic and interactions with the server happen.

What is on this github is the current prototype idea we have. A simple website with UI adapted for VR (Big buttons, least amount of typing possible) with only the books themselves interactive. The books have a background, a terrain and the book itself. For now it is a simple set of boxes, but in the future better textures and overall better quality books can be added.

I did 2 prototypes for moving files from the Store folder to Library folder (This is how the buying logic works in this prototype) one using python the other node. Both dont work on the Quest 2 VR. I noticed the biggest problem with development on the VR headset is the closed source of the device itself, being unable to access terminal to install python, git clone or even unzip files (VR testing was done by downloading every single component individually trough github and later navigating trough the browser to the respective destination)

Overall this is a very work in progress prototype, but it can still showcase the advantages, disadvantage, strengths and weaknesses of VR reading. It is not much, but for the little time I had, I am happy that I was able to learn UnrealEngine enough to launch a couple of test scenes with interactive objects, and that this little test website even worked. There is a lot to work on, in case the idea should be continued, but its a start, and thats what matters.

In the LibraryBooks and StoreBooks I used https://github.com/stemkoski/A-Frame-Examples . Those are amazing examples that showcase the possibilities of VR inside of a web browser
I made a book using aframes, but it is much more challenging. It is still visible as Book1-1.html .

---------------------------------------------------------------------------------------------------------------------------------------------------------------------

How to run:

Git clone https://github.com/sanjrino/HCI_EnhancingReadingExperience.git
cd HCI_EnhancingReadingExperience.git
modify the server.js with your own IP, or use default localhost
open a web browser either on a pc or a vr headset and have fun

For vr, to open the website in vr mode, https is needed. What I did is: 

Terminal:

openssl genpkey -algorithm RSA -out key.pem
openssl req -new -key key.pem -out csr.pem
openssl req -x509 -days 365 -key key.pem -in csr.pem -out cert.pem

in server.js replace:

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

to this:

const https = require('https');
const fs = require('fs');

const options = {
  key: fs.readFileSync('key.pem'),
  cert: fs.readFileSync('cert.pem')
};

const server = https.createServer(options, app);

const PORT = 3000;
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

I'm sure this is not how you should do it, but it worked
