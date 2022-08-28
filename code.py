from WPILib import *

sides = None

# Draw a polygon with any given sides
def polygon(sides):
  for count in range(int(sides)):
    driveBase.straight(150)
    driveBase.turn((360 / sides))
