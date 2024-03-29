import BaseTheme from '../../../base/ui/components/BaseTheme.native';

export default {
    container: {
        backgroundColor: BaseTheme.palette.ui01,
        flex: 1
    },

    clearableInput: {
        wrapper: {
            marginBottom: BaseTheme.spacing[3],
            marginTop: BaseTheme.spacing[3]
        },

        input: { textAlign: 'left' }
    },

    grid: {
        flex: 1,
        marginLeft: BaseTheme.spacing[3],
        marginRight: BaseTheme.spacing[3]
    },

    credit: {
        alignItems: 'center',
        backgroundColor: BaseTheme.palette.ui01,
        display: 'flex',
        flexDirection: 'row',
        height: 56,
        justifyContent: 'center',
        marginBottom: BaseTheme.spacing[0],
        paddingBottom: BaseTheme.spacing[4],
        width: '100%'
    },

    creditText: {
        color: 'white',
        fontWeight: 'bold'
    }
};
