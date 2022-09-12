Blockly.Blocks['fp_encoder'] = {
  init: function () {
    this.appendDummyInput()
      .appendField("Encoder:")
      .appendField(new Blockly.FieldTextInput("myEncoder"), "NAME")
      .appendField(new Blockly.FieldDropdown([["GP2", "GP2"], ["GP3", "GP3"], ["GP4", "GP4"], ["GP5", "GP5"]]), "PIN_A")
      .appendField(new Blockly.FieldDropdown([["GP2", "GP2"], ["GP3", "GP3"], ["GP4", "GP4"], ["GP5", "GP5"]]), "PIN_B")
      .appendField("Reversed?")
      .appendField(new Blockly.FieldCheckbox("FALSE"), "REVERSED");
    this.setOutput(true, null);
    this.setColour(65);
    this.setTooltip("");
    this.setHelpUrl("");
  }
};

Blockly.Blocks['fp_motor'] = {
  init: function () {
    this.appendDummyInput()
      .appendField("Motor:")
      .appendField(new Blockly.FieldTextInput("myMotor"), "NAME")
      .appendField(new Blockly.FieldDropdown([["GP8", "GP8"], ["GP9", "GP9"], ["GP10", "GP10"], ["GP11", "GP11"]]), "PIN_A")
      .appendField(new Blockly.FieldDropdown([["GP8", "GP8"], ["GP9", "GP9"], ["GP10", "GP10"], ["GP11", "GP11"]]), "PIN_B")
      .appendField("Reversed?")
      .appendField(new Blockly.FieldCheckbox("FALSE"), "REVERSED");
    this.appendValueInput("ENCODER")
      .setCheck("fp_encoder")
      .setAlign(Blockly.ALIGN_RIGHT)
      .appendField("Encoder");
    this.setOutput(true, null);
    this.setColour(330);
    this.setTooltip("Add encoder block");
    this.setHelpUrl("");
  }
};

Blockly.Blocks['fp_drivebase'] = {
  init: function () {
    this.appendDummyInput()
      .appendField("Drivebase:")
      .appendField(new Blockly.FieldTextInput("myDrivebase"), "NAME");
    this.appendValueInput("MOTOR_1")
      .setCheck("fp_motor")
      .setAlign(Blockly.ALIGN_RIGHT)
      .appendField("Motor 1");
    this.appendValueInput("MOTOR_2")
      .setCheck("fp_motor")
      .setAlign(Blockly.ALIGN_RIGHT)
      .appendField("Motor 2");
    this.setOutput(true, null);
    this.setColour(210);
    this.setTooltip("");
    this.setHelpUrl("");
  }
};

Blockly.Blocks['fp_drivebase'] = {
  init: function () {
    this.appendDummyInput()
      .appendField("Drivebase:")
      .appendField(new Blockly.FieldTextInput("myDrivebase"), "NAME");
    this.appendValueInput("MOTOR_1")
      .setCheck("fp_motor")
      .setAlign(Blockly.ALIGN_RIGHT)
      .appendField("Motor 1");
    this.appendValueInput("MOTOR_2")
      .setCheck("fp_motor")
      .setAlign(Blockly.ALIGN_RIGHT)
      .appendField("Motor 2");
    this.setOutput(true, null);
    this.setColour(210);
    this.setTooltip("");
    this.setHelpUrl("");
  }
};

Blockly.Blocks['fp_drivebase_effort'] = {
  init: function () {
    this.appendDummyInput()
      .appendField("Set Effort");
    this.appendDummyInput()
      .appendField("Effort 1:")
      .appendField(new Blockly.FieldNumber(0, -1, 1), "EFFORT1")
      .appendField("Effort 2:")
      .appendField(new Blockly.FieldNumber(0, -1, 1), "EFFORT2");
    this.appendValueInput("DRIVEBASE")
      .setCheck("fp_drivebase")
      .setAlign(Blockly.ALIGN_RIGHT)
      .appendField("Drivebase:");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(290);
    this.setTooltip("");
    this.setHelpUrl("");
  }
};

Blockly.Blocks['fp_getpos'] = {
  init: function () {
    this.appendValueInput("MOTOR")
      .setCheck("fp_motor")
      .appendField("Get Motor Position");
    this.setOutput(true, null);
    this.setColour(230);
    this.setTooltip("");
    this.setHelpUrl("");
  }
};

Blockly.Blocks['fp_reset_drivebase'] = {
  init: function () {
    this.appendValueInput("DRIVEBASE")
      .setCheck("fp_drivebase")
      .appendField("Reset Drivebase Positions");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(160);
    this.setTooltip("");
    this.setHelpUrl("");
  }
};

Blockly.Blocks['fp_seteffort'] = {
  init: function () {
    this.appendDummyInput()
      .appendField("Set Effort")
      .appendField(new Blockly.FieldNumber(0, -1, 1), "val1")
      .appendField(new Blockly.FieldNumber(0, -1, 1), "val2");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("");
    this.setHelpUrl("");
  }
};

Blockly.Blocks['fp_straight'] = {
  init: function () {
    this.appendDummyInput()
      .appendField("Drive Straight")
      .appendField(new Blockly.FieldNumber(0), "dist");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("");
    this.setHelpUrl("");
  }
};

Blockly.Blocks['fp_turn'] = {
  init: function () {
    this.appendDummyInput()
      .appendField("Turn")
      .appendField(new Blockly.FieldNumber(0), "angle");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("");
    this.setHelpUrl("");
  }
};

Blockly.Blocks['fp_getsonardist'] = {
  init: function () {
    this.appendDummyInput()
      .appendField("Sonar Distance");
    this.setOutput(true, null);
    this.setColour(230);
    this.setTooltip("");
    this.setHelpUrl("");
  }
};

Blockly.Blocks['fp_sleep'] = {
  init: function () {
    this.appendDummyInput()
      .appendField("Sleep")
      .appendField(new Blockly.FieldNumber(0, 0), "TIME");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("");
    this.setHelpUrl("");
  }
};

Blockly.Blocks['fp_setefforts'] = {
  init: function () {
    this.appendDummyInput()
      .appendField("Set Efforts")
      .appendField(new Blockly.FieldNumber(0), "val1");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("");
    this.setHelpUrl("");
  }
};


Blockly.Blocks['fp_turn_val'] = {
  init: function () {
    this.appendValueInput("angle")
      .setCheck("Number")
      .appendField("Turn");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("");
    this.setHelpUrl("");
  }
};

Blockly.Blocks['fp_straight_val'] = {
  init: function () {
    this.appendValueInput("dist")
      .setCheck("Number")
      .appendField("Drive Straight");
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("");
    this.setHelpUrl("");
  }
};