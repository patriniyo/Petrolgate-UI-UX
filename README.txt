Frontend folder Structure
-------------------------------------------------------------------------------------------------------------
-------------------------------------------------------------------------------------------------------------
.
+-- sass                    # contains sass files(.scss) that are to be compiled down to the normal css
�    +-- common             # contains sass files for styles that apply on more than one page
�    +-- includes           # contains sass files that are unique and correspond to one html partial
+-- Scripts                 # contains javascripts files written in ES6 and more and js files corresponding to single page or any other specific scripts
�    +-- imports            # contains javscript files specific to one page or action and will be imported in single file to be transpiled
+-- static                  # contains files that are actually going to be loaded by the server into the browser. like css,javascrits, images, etc
�     +-- images            # all images of the project
�     +-- res               # contains files that hold common configurations and files needed by the project like language and database configs and so on
�     +-- scripts           # contains the transpiled javascript scripts
�     +-- styles            # contains the css styles
+-- Views                   # contains all views
      +-- page              # contains html pages
      +-- templates         # contains html partials - fragment views

---------------------------------------------------------------------------------------------------------------
---------------------------------------------------------------------------------------------------------------

Scripts
------------------
1.build-css : responsible for compiling saas into normal css. it compiles sass from sass/main.scss into static/styles/main.css, the file that will be actually loaded
2.build-js  : responsible for transpiling newer features of javascript into older versions of javascript so that even older browser can run the scripts.it transiple scripts from scripts/bootsrap.js into static/scripts/bootstrap.js
3.build     : responsible for executing both the above scripts at the same time.
4.clean-css : responsible for cleaning main css file by removing unnecessary space and making not to start a new line, this makes the file as light as possible.
 these are the main scripts and alongside the other scripts that are not mentioned in this document are found in the file "package.json" in its scripts object.
