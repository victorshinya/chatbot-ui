import React from 'react';

import './index.css';

const Message = (props) => {
    return (
        <div key={props.index} className={[props.object.from === 'user' ? 'from from-user' : 'from from-watson', props.index === 0 ? 'first' : ''].filter(e => !!e).join(' ')}>
            {
                (() => {
                    if (props.object.response_type === 'text') return <p>{props.object.message}</p>;
                    if (props.object.response_type === 'image') return <img src={props.object.source} alt='Response from Watson' />
                    else return <p>Format not supported</p>
                })()
            }
        </div>
    )
}

export default Message;
