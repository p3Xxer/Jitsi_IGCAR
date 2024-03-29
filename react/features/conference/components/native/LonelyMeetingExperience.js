import React, { PureComponent } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

import { getFeatureFlag, INVITE_ENABLED } from '../../../base/flags';
import { translate } from '../../../base/i18n';
import { Icon, IconAddPeople } from '../../../base/icons';
import { getParticipantCountWithFake } from '../../../base/participants';
import { connect } from '../../../base/redux';
import { isInBreakoutRoom } from '../../../breakout-rooms/functions';
import { doInvitePeople } from '../../../invite/actions.native';

import styles from './styles';

/**
 * Props type of the component.
 */
type Props = {

    /**
     * True if currently in a breakout room.
     */
     _isInBreakoutRoom: boolean,

    /**
     * True if the invite functions (dial out, invite, share...etc) are disabled.
     */
    _isInviteFunctionsDiabled: boolean,

    /**
     * True if it's a lonely meeting (participant count excluding fakes is 1).
     */
    _isLonelyMeeting: boolean,

    /**
     * The Redux Dispatch function.
     */
    dispatch: Function,

    /**
     * Function to be used to translate i18n labels.
     */
    t: Function
};

/**
 * Implements the UI elements to be displayed in the lonely meeting experience.
 */
class LonelyMeetingExperience extends PureComponent<Props> {
    /**
     * Instantiates a new component.
     *
     * @inheritdoc
     */
    constructor(props: Props) {
        super(props);

        this._onPress = this._onPress.bind(this);
    }

    /**
     * Implements {@code PureComponent#render}.
     *
     * @inheritdoc
     */
    render() {
        const {
            _isInBreakoutRoom,
            _isInviteFunctionsDiabled,
            _isLonelyMeeting,
            t
        } = this.props;

        if (!_isLonelyMeeting) {
            return null;
        }

        return (
            <View style = { styles.lonelyMeetingContainer }>
                <Text style = { styles.lonelyMessage }>
                    { t('lonelyMeetingExperience.youAreAlone') }
                </Text>
                { !_isInviteFunctionsDiabled && !_isInBreakoutRoom && (
                    <TouchableOpacity
                        onPress = { this._onPress }
                        style = { styles.lonelyButton }>
                        <Icon
                            size = { 24 }
                            src = { IconAddPeople }
                            style = { styles.lonelyButtonComponents } />
                        <Text style = { styles.lonelyButtonComponents }>
                            { t('lonelyMeetingExperience.button') }
                        </Text>
                    </TouchableOpacity>
                ) }
            </View>
        );
    }

    /**
     * Callback for the onPress function of the button.
     *
     * @returns {void}
     */
    _onPress() {
        this.props.dispatch(doInvitePeople());
    }
}

/**
 * Maps parts of the Redux state to the props of this Component.
 *
 * @param {Object} state - The redux state.
 * @private
 * @returns {Props}
 */
function _mapStateToProps(state) {
    const { disableInviteFunctions } = state['features/base/config'];
    const { conference } = state['features/base/conference'];
    const flag = getFeatureFlag(state, INVITE_ENABLED, true);
    const _isInBreakoutRoom = isInBreakoutRoom(state);

    return {
        _isInBreakoutRoom,
        _isInviteFunctionsDiabled: !flag || disableInviteFunctions,
        _isLonelyMeeting: conference && getParticipantCountWithFake(state) === 1
    };
}

export default connect(_mapStateToProps)(translate(LonelyMeetingExperience));
