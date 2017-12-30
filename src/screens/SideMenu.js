import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, Text, TouchableHighlight, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import Icon from 'react-native-vector-icons/Ionicons';
import styles from '../commonStyle';

import I18n from '../i18n';

const menu = [
  {
    id: 0,
    title: 'Home',
    icon: 'ios-home',
    link: 'tab/mdp.HomeScreen',
  },
  {
    id: 1,
    title: 'My benefits',
    icon: 'md-medkit',
    link: 'tab/mdp.MyBenefitsScreen',
  },
  {
    id: 2,
    title: 'Digital Card',
    icon: 'ios-card',
    link: 'tab/mdp.DigitalCardScreen',
  },
  {
    id: 3,
    title: 'Member Resource',
    icon: 'ios-paper',
    link: 'tab/mdp.MemberResourceScreen',
  },
  {
    id: 4,
    title: 'Alerts',
    icon: 'ios-notifications',
    link: 'tab/mdp.AlertsScreen',
  },
  {
    id: 5,
    title: 'Chat',
    icon: 'md-chatbubbles',
    link: 'push/mdp.NeedHelpScreen',
  },
  { id: 6, title: 'Logout', icon: 'ios-power' },
];

class SideMenu extends Component {
  static propTypes = {
    navigator: PropTypes.object.isRequired,
    user: PropTypes.object,
  };

  static defaultProps = {
    user: null,
  };

  constructor(props) {
    super(props);

    this.state = {};

    this.menuPress = this.menuPress.bind(this);
    this.toggleDrawer = this.toggleDrawer.bind(this);
  }

  toggleDrawer() {
    this.props.navigator.toggleDrawer({
      to: 'closed',
      side: 'left',
      animated: false,
    });
  }

  menuPress(link) {
    this.toggleDrawer();
    this.props.navigator.handleDeepLink({
      link,
    });
  }

  render() {
    const { user } = this.props;
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: '#ffffff',
        }}
      >
        <View
          style={{
            height: 150,
            backgroundColor: 'green',
            borderBottomWidth: StyleSheet.hairlineWidth,
          }}
        >
          {user && (
            <View style={{ flex: 1, justifyContent: 'flex-end', padding: 10 }}>
              <Text>Hello,</Text>
              <Text>{`${user.FirstName} ${user.LastName}`}</Text>
            </View>
          )}
        </View>
        {menu.map(item => (
          <TouchableHighlight
            key={item.id}
            underlayColor="#D3D3D3"
            onPress={() => this.menuPress(item.link)}
          >
            <View style={{ flexDirection: 'row', alignItems: 'center', padding: 10 }}>
              <Icon name={item.icon} size={24} />
              <Text style={{ paddingLeft: 16 }}>{item.title}</Text>
            </View>
          </TouchableHighlight>
        ))}
      </View>
    );
  }
}

const mapStateToProps = state => ({
  user: state.user.user,
});

export default connect(mapStateToProps)(SideMenu);
