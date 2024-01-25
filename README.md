HCI project about enchancing reading experience.

Original idea was to use UnrealEngine 5 to create scenes with books to read in vr, while enjoying the immersive scenery.
My hardware did not agree, so we had to scrap the idea (The requirements to run Unreal and VR are LinusTechTip levels).

Lower demanding system was required.
After analising current state of vr websites, I decided to go with a-frames to provide a nice and 3d look to it.
It resulted in input problems (did not accept VR clicks, or pc clicks...) so I reserved a-frames and 3D only for the book page, where less logic and interactions with the server happen.

What is on this github is the current prototype idea we have.
A simple website with UI adapted for VR (Big buttons, least amount of typing possible) with only the books themselves interactive.
The books have a background, a terrain and the book itself. For now it is a simple set of boxes, but in the future better textures and overall better quality books can be added.

I did 2 prototypes for moving files from the Store folder to Library folder (This is how the buying logic works in this prototype) one using python the other node.
Both dont work on the Quest 2 VR. I noticed the biggest problem with development on the VR headset is the closed source of the device itself,
being unable to access terminal to install python, git clone or even unzip files (VR testing was done by downloading every single component individually trough github 
and later navigating trough the browser to the respective destination)

Overall this is a very work in progress prototype, but it can still showcase the advantages, disadvantage, strengths and weaknesses of VR reading.
It is not much, but for the little time I had, I am happy that I was able to learn UnrealEngine enough to launch a couple of test scenes with interactive objects, 
and that this little test website even worked. There is a lot to work on, in case the idea should be continued, but its a start, and thats what matters.

