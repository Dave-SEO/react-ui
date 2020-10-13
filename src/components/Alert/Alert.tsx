import React, {FC, useState} from 'react'
import classnames from 'classnames'
// 枚举 alert的类型
export enum AlertType {
    success = 'success',
    default = 'default',
    danger = 'danger',
    warning = 'warning'
}
// 类型断言
// export type AlertType = 'success' | 'default' | 'danger' | 'warning'

interface IBaseAlert {
    type: AlertType,
    title: string,
    description?: string,
    center?: boolean,
    closable?: boolean,
    // children: React.ReactNode
}

export const Alert: FC<IBaseAlert> = (props) =>{
    const {
        type,
        title,
        description,
        center,
        closable
    } = props
    const [visible, setVisible] = useState(false)
    const classNamed = classnames('alert', {
        [`alert-${type}`] : type,
        'is-dailog': visible
    })
    function close(closable: any){
        console.log(closable)
        setVisible(true)
    }
    return (
        <div className={classNamed} >
            <div className='alert-contet'>
                <h5 className='alert-title'>{title}</h5>
                {
                    description ? <p className='alert-desc'>{description}</p> : ''
                }
                <i className='alert-close' onClick={() => close(closable)}>x</i>
            </div>
        </div>
    )
}

export default Alert