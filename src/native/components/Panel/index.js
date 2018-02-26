import React, { Component } from 'react';
import { Text, View, TouchableHighlight, Animated } from 'react-native';
import PropTypes from 'prop-types';
import Icon from 'react-native-vector-icons/Ionicons';
import styles from './styles';

class Panel extends Component {
  constructor(props) {
    super(props);

    this.state = {
      title: props.title,
      subTitle: props.subTitle,
      expanded: props.expanded,
      animation: new Animated.Value(),
    };
    this.setMinHeight = this.setMinHeight.bind(this);
    this.setMaxHeight = this.setMaxHeight.bind(this);
    this.toggle = this.toggle.bind(this);
  }

  setMaxHeight(event) {
    const { expanded, minHeight } = this.state;
    const { height } = event.nativeEvent.layout;
    if (expanded) {
      this.state.animation.setValue(height + minHeight);
    }
    this.setState({
      maxHeight: event.nativeEvent.layout.height,
    });
  }

  setMinHeight(event) {
    const { expanded } = this.state;
    const { height } = event.nativeEvent.layout;
    if (!expanded) {
      this.state.animation.setValue(height);
    }
    this.setState({
      minHeight: height,
    });
  }

  toggle() {
    const initialValue = this.state.expanded
      ? this.state.maxHeight + this.state.minHeight
      : this.state.minHeight;

    const finalValue = this.state.expanded
      ? this.state.minHeight
      : this.state.maxHeight + this.state.minHeight;

    this.setState({
      expanded: !this.state.expanded,
    });

    this.state.animation.setValue(initialValue);
    Animated.spring(this.state.animation, {
      toValue: finalValue,
    }).start();
  }

  render() {
    let icon = 'ios-arrow-down';

    if (this.state.expanded) {
      icon = 'ios-arrow-up';
    }
    const { title, subTitle, animation } = this.state;
    const { children } = this.props;
    return (
      <Animated.View style={[styles.container, { height: animation }]}>
        <TouchableHighlight style={styles.button} onPress={this.toggle} underlayColor="#f1f1f1">
          <View style={styles.titleContainer} onLayout={this.setMinHeight}>
            <View>
              <Text style={styles.title}>{title}</Text>
              <Text style={styles.subTitle}>{subTitle}</Text>
            </View>

            <Icon style={styles.iconStyle} name={icon} size={24} />
          </View>
        </TouchableHighlight>
        <View style={styles.body} onLayout={this.setMaxHeight}>
          {children}
        </View>
      </Animated.View>
    );
  }
}

Panel.propTypes = {
  title: PropTypes.string.isRequired,
  subTitle: PropTypes.string,
  expanded: PropTypes.bool,
  children: PropTypes.element.isRequired,
};

Panel.defaultProps = {
  subTitle: '',
  expanded: false,
};

export default Panel;
