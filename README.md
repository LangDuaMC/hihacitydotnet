## hihacity *landing page*

A website to promote the server sponsored by Hiha youtuber

> Server is no longer operated

https://github.com/user-attachments/assets/b7572d5f-6f1f-4634-aaec-9e0b3b89bdc4

The only selling point of this project is the sleek parallax.

To achieve this, first you want to:

- Using a shader of your own choice (prefer no bloom, least lightshaft), and in this case, a posterized shader with barebones texturepack!
- Using depthmap shader

In blender, composition:

- Create a canvas multiply by n slices of your input image
- In each layer:
  - Highest layer (nearest, darkest in depthmap) is kept while the further is alpha-cutted
  - Next layer, from the last height to the next height is kept, further is cutted, while the nearer is blurred with resolution stretch in y-axis for our effect
- export the slice, cut it, then tune the sass
