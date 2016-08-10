/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, {Component} from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    Slider,
    Dimensions,
    TextInput,
    Switch
} from 'react-native';

var {width, height} = Dimensions.get('window');
class socket2 extends Component {
    constructor() {
        super();

        this.state = {
            ws_status: 'disconnect',
            value: 0,
            max: 255,
            valueswitch: false
        }
    }

    render() {

        var detectSlider = (value) => {
            this.setState({value: value});
            this.ws.send(String(value));
        };
        var onChangeTopic = function (event) {
            this.setState({topic: event.nativeEvent.text});
            console.log(this.state.topic);
        }.bind(this);

        var onChangeSwitch = function () {
            if (this.state.valueswitch == false) {
                this.ws = new WebSocket('ws://'+ this.state.topic+':81');
                this.ws.onopen = () => {
                    this.setState({ws_status: 'open'});
                    console.log("on open");
                };
                this.ws.onmessage = function (e) {
                     console.log(e);
                };
                this.ws.onclose = () => {
                    this.setState({ws_status: 'close'});
                };
                this.setState({switchState: true, switchLabel: 'ON', colorState: 'green', valueswitch: true});
            } else {
                this.setState({
                    ws_status: 'disconnect',
                    switchLabel: 'OFF',
                    value: 0,
                    valueswitch: false
                });
            }

        }.bind(this);


        return (
            <View style={styles.container}>
                <View style={styles.header}>
                    <Text style={{fontSize: 50}}>DIMMER</Text>
                    <Text style={{fontSize: 10}}>V 2.0</Text>

                    <TextInput
                        placeholder=' IP Address'
                        onChange={onChangeTopic}
                        style={styles.topicInput}
                    />
                    <Switch
                        value={this.state.valueswitch}
                        onValueChange={onChangeSwitch}
                    />

                </View>
                <View style={styles.body}>
                    <Slider
                        style={styles.slider}
                        step={20}
                        maximumValue={this.state.max}
                        value={this.state.value}
                        onValueChange={detectSlider}
                        //onValueChange={(value) => this.setState({value: value})}
                    />
                    <Text style={{fontSize: 20}}> Value : {this.state.value} </Text>

                    <Text style={{fontSize: 20}}> ws : {this.state.ws_status} </Text>

                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
    header: {
        flex: 5,
        justifyContent: 'space-around',
        alignItems: 'center',


    },
    body: {
        flex: 5,
        alignItems: 'center',


    },
    slider: {
        // width: width
        height: 50,
        width: 300
    },
    topicInput: {
        fontSize: 20,
        fontWeight: '100',
        height: 50,
        width: 300,
        borderWidth: 0.5,
        borderColor: 'cornflowerblue',
        borderRadius: 10,
        marginTop: 10
    },
});

AppRegistry.registerComponent('socket2', () => socket2);


