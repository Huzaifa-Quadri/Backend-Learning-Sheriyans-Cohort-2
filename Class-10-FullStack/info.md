# Deploy Backend and Frontend on single Port or Together

1. After devloping full frontend, run - npm run build
2. This will create a config folder in #root and generate 3 files containing(rendering) whole frontend {Output Files} :
   a. index.html
   b. assets/index-<something>.css
   b. assets/index-<something>.js
3. Copy all the files inside config folder to backend inside public folder of #root backend project
4. We will to create a wildcard api to handle unknown api endpoints(not created by programmer) and will deploy our frontend on "/" endpoint.
5. in the this api, we will use res.sendFile() to give location of index.html file that is inside public folder.
6. Since sendFile() need absolute path we need 'path' module to handle it.
   const path = require('path);
7. Edit sendFile as -
   res.dendFile(path.join(\_\_dirname, "..", "/public/index.html"));
   (i) \_\_dirname -> Gives the absolute path of file where it is called
   (ii) path.join() -> joins the whole path as one

8. With this it wil get correct path to load HTML file but it will fail since html file on load will also request css and js file(s) in assets but since it will not get the address of that, it will be redirect again to have its own html file path with wildcard api endpoint.

9. For resolving this, we will use another middle ware as -
   app.use(express.static("./public"))

## app.use(express.static("./public")) express ko batata hai ki css, js, images jaise static files public folder se serve karni hain.... internally jab request aati hai express pehle check karta hai ki file public folder me exist karti hai ya nahi... agar karti hai to bina routes ya logic chalaye direct browser ko file bhej deta hai isse app fast aur simple ho jata hai....

## express by default files expose nahi karta for security reason

express.static ek auto route bana deta hai jo url ko public folder ke files se map karta hai isliye css/js visible ho jaati hain...

10. Now we have our frontend site and backend on port 3000 serving both on backend project.
