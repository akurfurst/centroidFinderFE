# Components

## Controls
- The controls of the processor, including TargetColor and Threshold

## TargetColor
- The input for the TargetColor

## Threshold
- The input for the Threshold

## Preview
- The first frame of the video, and the binarized frame of the video

## Frame
- Shows the given frame
- The frame, in this case, is a prop

# Pages

## `/videos`
- 

## `/preview/:filename`
### State
- targetColor
- threshold

```
H1 - Video Processor
Controls 
    TargetColor
        - setTargetColor
    Threshold
        - setThreshold
Preview
    Frame 
        - original_image
    Frame 
        - binarized_image
Button
    onClick - fetch POST api/process/:filename
```