import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Modal } from "react-native";

const ModalLogin = ({visible}) => {
    const [show, setShow] = useState(visible);
    return(
        <Modal style={{backgroundColor: 'blue', width: '100%', height: '100%'}} visible={show} onRequestClose={() => {setShow(!show)}} transparent={true}>
            <Text style={{marginTop: '40%'}}>AHOJ</Text>
        </Modal>
    )
}

export default ModalLogin;