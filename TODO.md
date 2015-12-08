# TODO

+ VectorList.rotate tests
+ RotateControl Component
+ Research Perspective
  + https://www.youtube.com/watch?v=3ZmqJb7J5wE&list=PLW3Zl3wyJwWOpdhYedlD-yCB7WQoHf-My&index=38
  + https://www.youtube.com/watch?v=jeO_ytN_0kk
  + https://www.youtube.com/watch?v=dul0mui292Q
+ Polygon 2D Transformation
+ Polygon 3D Transformation / Projecting 3D Object to 2D Plane
+ Polygon Class
  + Polygon is a group of connected vectors.
  + All vectors lie on the same 2D plane.
  + Lines between two connected vectors are known as edges.
  + The edges form a face.
  + The face may have a fill style.
  + Polygon definitions must be clear about how vectors are connected.
  + We can assume, given a list of vectors v that ...
    + v[n] connects with vector v[n + 1].
    + v[-1] connects with v[1].
  + We also assume that there are no crossing edges and therefore do nothing to
    detect or correct them.
  + Polygons may be transformed into 3D space by rotation and translation.
  + After transformation, all vectors still remain on the same 2D plane even
    if that plane doesn't align with one of the normal x, y, z axis.
  + Polygons expose their vectors and fill style for drawing functions.
  + Maybe to keep a consistent, generic interface for drawing functions, exposes
    list of faces, contining only the Polygon itself, so drawing functions can
    always ask for faces first, then ask each face for vectors and fill style.
+ Regular Polygons
+ Polyhedron Class
  + Polyhedron is a group of polygons arranged to form a 3D shape.
  + In this context, it is common to call the polygon a face.
  + Faces aren't necessarily connected, only transformed to look like so.
  + A Polyhedron may be transformed by rotation and translation.
  + After Polyhedral transformation, relative distance and orientation of all
    faces to other faces within Polyhedron should remain intact.
  + Polyhedrons expose their faces, which are simply Polygons, for drawing
    functions.
+ Polyhedron Example
+ Regular Polyhedrons
+ Group Class(es)
  + PolyhedronGroup Class
    + A group of Polyhedrons (duh).
    + May be transformed. Polyhedron relationships remain intact.
    + Reduces list of Polyhedrons to a list of faces, which it exposes for
      drawing functions.
  + PolygonGroup Class
    + A group of Polygons.
    + May be transformed. Relations intact.
    + Reduces list of Polygons to a list of faces, exosed for drawing.
  + May be able to collapse these Group classes into one, especially if the
    Polygon interface mimics the Polyhedron interface. This will make it easier
    for the rest of the library since it doesn't have to treat these Groups
    differently. Nor do we have to maintain two classes that are 90% the same.
    We want to avoid inheritance for the sake of simplicity.
+ Transparency
+ Cube Example
+ Canvas.draw(Shapes) to replace drawCircle, drawLine, drawGrid, etc.
+ Pyramid Example
+ Canvas Component (receive shapes as prop, redraw on update)
+ lineDash / styling
+ Textures / Skin
+ Cylinder Example
+ Sphere Example
+ Lighting
  + Shadows
  + Shading
  + Reflections
  + Gloss
+ Motion/Physics
+ Quaternions and Euler angles
  + https://www.youtube.com/watch?v=Ne3RNhEVSIE&index=34&list=PLW3Zl3wyJwWOpdhYedlD-yCB7WQoHf-My
  + http://answers.unity3d.com/questions/645903/please-explain-quaternions.html
  + http://www.3dgep.com/understanding-quaternions/
  + http://docs.unity3d.com/ScriptReference/Quaternion.Euler.html
  + http://www.euclideanspace.com/maths/algebra/realNormedAlgebra/quaternions/index.htm
+ See if it makes sense to either expand or eliminate the Trig module

+ .editorconfig
+ Split React Components into separate lib(s)
+ Test React Components
+ Split examples into separate repo
+ Make Examples pretty
+ Public Documentation
+ Linting
+ Publish to Github Pages
+ Package exports in index.js
+ Files to exclude from npm install
+ Graduate example modules
