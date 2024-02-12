// QuitButton.js

import React from 'react';
import { Button } from 'react-native';

const QuitButton = ({ onPress }) => {
    return <Button title="Quit" onPress={onPress} />;
};

export default QuitButton;
