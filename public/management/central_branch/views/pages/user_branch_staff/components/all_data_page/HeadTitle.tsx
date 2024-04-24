import React from 'react';
export interface Props {}

const HeadTitle: React.FC<Props> = (props: Props) => {
    return (
        <div className="title no_move" id="users_drag">
            <h2>users</h2>
        </div>
    );
};

export default HeadTitle;
