Blockly.Python['fp_encoder'] = function (block) {
  var text_name = block.getFieldValue('NAME');
  var dropdown_pin_a = block.getFieldValue('PIN_A');
  var dropdown_pin_b = block.getFieldValue('PIN_B');
  var checkbox_reversed = block.getFieldValue('REVERSED') === 'TRUE';
  var code = `enc.encoder(a=board${dropdown_pin_a}, b=board.${dropdown_pin_a}, ticksPerRev=144, doFlip=${checkbox_reversed ? 'True' : 'False'})`;
  // TODO: Change ORDER_NONE to the correct strength.
  return [code, Blockly.Python.ORDER_NONE];
};

Blockly.Python['fp_motor'] = function (block) {
  var text_name = block.getFieldValue('NAME');
  var dropdown_pin_a = block.getFieldValue('PIN_A');
  var dropdown_pin_b = block.getFieldValue('PIN_B');
  var checkbox_reversed = block.getFieldValue('REVERSED') === 'TRUE';
  var value_encoder = Blockly.Python.valueToCode(block, 'ENCODER', Blockly.Python.ORDER_ATOMIC);
  var code = `em.encoded_motor(${value_encoder}, board.${dropdown_pin_a}, board.${dropdown_pin_b}, ${text_name}, doFlip=${checkbox_reversed ? 'True' : 'False'})`;
  // TODO: Change ORDER_NONE to the correct strength.
  return [code, Blockly.Python.ORDER_NONE];
};

Blockly.Python['fp_drivebase'] = function (block) {
  var text_name = block.getFieldValue('NAME');
  var value_motor_1 = Blockly.Python.valueToCode(block, 'MOTOR_1', Blockly.Python.ORDER_ATOMIC);
  var value_motor_2 = Blockly.Python.valueToCode(block, 'MOTOR_2', Blockly.Python.ORDER_ATOMIC);
  // var value_motor_1 = block.inputList[0].connection.targetBlock().getFieldValue('NAME');
  // var value_motor_2 = block.inputList[1].connection.targetBlock().getFieldValue('NAME');
  var code = `drv.drive(${value_motor_1}, ${value_motor_2})`;
  // TODO: Change ORDER_NONE to the correct strength.
  return [code, Blockly.Python.ORDER_NONE];
};

Blockly.Python['fp_drivebase_effort'] = function (block) {
  var number_effort1 = block.getFieldValue('EFFORT1');
  var number_effort2 = block.getFieldValue('EFFORT2');
  var value_drivebase = Blockly.Python.valueToCode(block, 'DRIVEBASE', Blockly.Python.ORDER_ATOMIC);
  var code = `${value_drivebase}.setEffort(${number_effort1}, ${number_effort2})\n`;;
  return code;
};

Blockly.Python['fp_getpos'] = function (block) {
  // Get the name of the connect motor block
  var value_name = Blockly.Python.valueToCode(block, 'MOTOR', Blockly.Python.ORDER_ATOMIC);
  var code = `${value_name}.getPos()`;
  // TODO: Change ORDER_NONE to the correct strength.
  return [code, Blockly.Python.ORDER_NONE];
};

Blockly.Python['fp_reset_drivebase'] = function (block) {
  var value_drivebase = Blockly.Python.valueToCode(block, 'DRIVEBASE', Blockly.Python.ORDER_ATOMIC);
  var code = `${value_drivebase}.setPos()\n`;
  return code;
};

Blockly.Python['fp_seteffort'] = function (block) {
  var number_val1 = block.getFieldValue('val1');
  var number_val2 = block.getFieldValue('val2');
  // TODO: Assemble Python into code variable.
  var code = `driveBase.setEffort(${number_val1}, ${number_val2})\n`;
  return code;
};

Blockly.Python['fp_straight'] = function (block) {
  var number_dist = block.getFieldValue('dist');
  // TODO: Assemble Python into code variable.
  var code = `driveBase.straight(${number_dist})\n`;
  return code;
};

Blockly.Python['fp_turn'] = function (block) {
  var number_angle = block.getFieldValue('angle');
  // TODO: Assemble Python into code variable.
  var code = `driveBase.turn(${number_angle})\n`;
  return code;
};

Blockly.Python['fp_getsonardist'] = function (block) {
  // TODO: Assemble Python into code variable.
  var code = `sonar.distance`;
  // TODO: Change ORDER_NONE to the correct strength.
  return [code, Blockly.Python.ORDER_NONE];
};

Blockly.Python['fp_sleep'] = function (block) {
  var number_time = block.getFieldValue('TIME');
  // TODO: Assemble Python into code variable.
  var code = `time.sleep(${number_time})\n`;
  return code;
};

Blockly.Python['fp_setefforts'] = function (block) {
  var number_val1 = block.getFieldValue('val1');
  // TODO: Assemble Python into code variable.
  var code = `driveBase.setEfforts(${number_val1})\n`;
  return code;
};


Blockly.Python['fp_turn_val'] = function (block) {
  var value_angle = Blockly.Python.valueToCode(block, 'angle', Blockly.Python.ORDER_ATOMIC);
  // TODO: Assemble Python into code variable.
  var code = `driveBase.turn(${value_angle})\n`;
  return code;
};

Blockly.Python['fp_straight_val'] = function (block) {
  var value_dist = Blockly.Python.valueToCode(block, 'dist', Blockly.Python.ORDER_ATOMIC);
  // TODO: Assemble Python into code variable.
  var code = `driveBase.straight(${value_dist})\n`;
  return code;
};