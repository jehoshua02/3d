# 3D Programming Notes

These are my notes on how I would guess 3D programming is/should be done. For fun, I'm thinking through it independently, refraining from doing any research until I feel I've got a good grasp on the subject.

## What's Missing?

+ World Type
+ Light Sources
+ Shading
+ Shadows
+ Reflections
+ Mist
+ Disappearing Horizon
+ Lifeforms
+ Interactivity
+ Physics
+ Details

## Processes

### Modeling and Rendering a 3D World

#### 1. Define 3D objects:

+ One kind of Object is just a group of points and faces.
+ Another kind of Object is a group of Objects.
+ Object points relative to it's own origin (0,0,0).

#### 2. Place 3D Objects in World:

+ World has it's own origin (0,0,0).
+ Perhaps just a Decorated 3D Object that groups other 3D Objects.
+ Objects could be wrapped in a World-Oriented Decorator:
  + World-relative origin property.
  + Method to convert Object relative points to World points.
  + Methods to rotate, move, relfect, scale, etc wrapped Object.

#### 3. Define the "Camera" object:

+ Camera is a Decorated World Object.
+ Camera owns two 3D Objects:
  + Field of View: rectangular pyramid 3D Object:
    + Bottomless or bottom far away.
    + Camera origin is the focal point and might as well be origin (0,0,0).
  + Lens: thin 3D Object positioned within Field of View.
    + Focal length determines how far from Field of View origin.
+ The Camera is rotated in a particular direction.
+ More than one Camera is a possibility.

#### 4. Determine which Objects to render:

+ Find all Objects containing points within Camera.
+ Determine if an Object overlaps another Object (`object.overlaps(object)`).
  + Determine if any of the discrete points of an Object are within other Object (`object.contains(point)`).
  + Need to consider Objects with rounded faces/paths.
+ Maybe eliminate eclipsed objects? (Beware premature optimization)

#### 5. Convert Objects to 2D Shapes

+ Map World Object points to Camera Field of View points.
+ Sort Objects by Z coordinate.
+ Use some magic method to convert Object to 2D Shape Groups.

#### 6. Draw 2D Shapes

+ Canvas exposes method for drawing 2D Shapes (`canvas.draw(shape)`).

## Types

### 3D Point

+ Has x, y, z properties.

### 3D Object

+ A 3D Object in pure form
+ A group of 3D Points and faces relative to local origin (0,0,0).

### 3D Group

+ A group of Objects/Groups positioned relative to a Group origin (0,0,0).

### 3D Camera

+ A Decorated Group.
+ Contains a rectangular pyramid, Field of View.
+ Contains a flat rectangle, the Lens, configured with a width and height equal to target canvas.
+ Responsible for finding Objects in Field of View.
+ Responsible for converting 3D Objects to 2D Groups on Lens.
+ Lens should probably match the target canvas width and height.

### 2D Point

+ Has x, y properties.

### 2D Shape

+ A group of 2D Points and a fill.

### 2D Group

+ A group of 2D Shapes positioned relative to the group origin (0,0).

### 2D Canvas

+ Facade for drawing 2D Shapes on some kind of target such as HTML5 Canvas.
