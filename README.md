# cloudclicker
Hardware button clicks tracked for posterity.

# How it does things
1. Hook up two or more clicky colorful buttons to a Particle Photon. You can press the buttons. Go ahead! So clicky~!
2. Each time you press a button, the color of the button pressed and a timestamp are recorded in a table.
3. Why would you want this? IDK! Maybe you'd like to count the number of cows you see and store this data in the cloud? Or maybe you'd like to build something dumb like [an email tracker](http://nobadinboxes.azurewebsites.net)? The possibilities are finite.

# Technologies
 - Particle Photon
 - webhooks
 - WebSockets (socket.io)
 - Azure Functions
 - Azure Table Storage
 - node.js

# TODO
1. Post Azure Function code.
2. Post Photon .ino code.
3. Post wiring diagram.
4. Add sounds!
5. Fix probably a bunch of bugs.
6. Explain this more.
