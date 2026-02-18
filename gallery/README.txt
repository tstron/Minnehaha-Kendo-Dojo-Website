How to add photos to the website gallery
=========================================

You only need to edit gallery.html (one place).

1. Add your image file(s) to this folder (gallery/) or to a subfolder (e.g. gallery/events/).

2. Open gallery.html and find the line that starts with:
   <script type="application/json" id="gallery-data">
   Edit the JSON: add the new image path(s) to the "images" array.
   - For images in this folder: use just the filename, e.g. "MyPhoto.jpg"
   - For images in a subfolder: use "subfolder/filename.jpg", e.g. "events/Banquet2024.jpg"

3. Save gallery.html. The gallery will show a new section for each subfolder (e.g. "Events" for the folder "events").

Supported image formats: .jpg, .jpeg, .png, .gif, .webp (use the exact filename in the JSON).

Note: gallery.json in this folder is an optional backup; the live gallery reads only from gallery.html.
