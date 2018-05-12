# FlappyNumbers

http://MCatherine1994.github.io/FlappyNumbers/

### Tutorial
[Simple start tutorial](https://www.w3schools.com/graphics/game_intro.asp)   
[Full screen](https://h3manth.com/content/html5-canvas-full-screen-and-full-page): Have a full screen game area  
[Step by step tutorial](https://developer.mozilla.org/en-US/docs/Games/Tutorials/2D_Breakout_game_pure_JavaScript)  
[Meta tag](https://www.w3schools.com/tags/tag_meta.asp)  
[Html preview](http://htmlpreview.github.io/): Preview your website  
[Background size resolution](https://gamedevelopment.tutsplus.com/articles/quick-tip-what-is-the-best-screen-resolution-for-your-game--gamedev-14723)  
How to Learn the Phaser HTML5 Game Engine: https://gamedevelopment.tutsplus.com/articles/how-to-learn-the-phaser-html5-game-engine--gamedev-13643  
The Complete Guide to Building HTML5 Games with Canvas & SVG: https://www.htmlgoodies.com/html5/client/the-complete-guide-to-building-html5-games-with-canvas-svg.html  
How to Make Flappy Bird in HTML5 With Phaser: http://www.lessmilk.com/tutorial/flappy-bird-phaser-1  

### Notes  
#### How to get the URL of the html file:   
1. Fork the repository to your account 
2. Clone it locally on your machine  
3. Create a gh-pages branch (if one already exists, remove it and create a new one based off master)  
4. Push the branch back to GitHub  
5. View the pages at http://username.github.io/repo    
```  
In code:  
git clone git@github.com:username/repo.git  
cd repo  
git branch gh-pages  
(might need to do this first: git branch -D gh-pages)  
git push -u origin gh-pages  
Go to http://username.github.io/repo
```  
#### Keys to drawing a rectangle around text  
```
// get references to canvas and context
var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");

var fontsize = 14;
var fontface = 'verdana';
var lineHeight = fontsize * 1.286;    // approximation of the height
var text = 'Draw a rectangle around me.';

ctx.font = fontsize + 'px ' + fontface;
var textWidth = ctx.measureText(text).width;

ctx.textAlign = 'left'; // this is the default to align horizontally to the left
ctx.textBaseline = 'top';  // text will be aligned vertically to the top

ctx.fillText(text, 20, 50);
ctx.strokeRect(20, 50, textWidth, lineHeight);
```  

#### Javascript  
getContext("2d") -- build-in object, with methods and properties for drawing  
component -- object constructor  

### How to play  
With the starting number, try to reach the goal number by hitting the correct opeartors and numbers, avoiding the incorrect ones.  

### Problem so far  
How to draw a number on a square  
 
