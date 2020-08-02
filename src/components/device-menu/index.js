import React from 'react';
import PropTypes from 'prop-types';
import { AppIcon } from 'components/app-icon';


export const DeviceMenu = ({ apps }) => {
    return (
        <>
            {apps.map(item => {
                const { id, name } = item;
                return (
                    <AppIcon
                        key={id}
                        name={name}
                        isLight={true}
                        hasPopup={true}
                    />
                )
            })}
        </>
    )
}

DeviceMenu.defaultProps = {
    apps: [],
}

DeviceMenu.propTypes = {
    apps: PropTypes.array,
}
