Phyllotaxis
===

Several implementation of a basic Phyllotaxis generation. The implementation is the formula `d = spread * sqrt(n)` and `theta = n * alpha`. Where n is the current sequence number. Spread is a constant value controlling the distance between placement. Alpha is a constant angle in degrees offsetting from the previous placement. 3D versions have another constant for offsetting the Z placement by a fixed value.

p5 implementation
===

Basic sketch to show implementation. Generates phyllotaxis pattern. Nothing user configurable.

a-frame implementation
===

3D prototype using basic spheres. Implemented as a component. Calculations are done in local space. a-frame translates to global space. Experiments with HSL color cycling. Utilizies the Z-offset. Configurable through component parameters.

Unreal implementation
===

Provides a phyllotaxis actor implemented in Blueprint. Internally the actor utilizes hierarchical static mesh for performance. Paramters are editable through the actor editor window. Exposing the mesh does not appear to be possible. The mesh must be hardcoded into the blueprint until that is possible.

Example map creates one actor with 15,000 points. Z-Offset is set such that it generates a parametric-style curve.
