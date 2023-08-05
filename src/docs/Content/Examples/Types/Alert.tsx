import React, { useEffect, useState } from 'react'
import { Tooltip } from '../../../../lib'
import logo from '../../../../assets/logo.svg'

export const Alert = () => {
    const [alternate, setAlternate] = useState(false)

    useEffect(() => {
        setInterval(() => {
            setAlternate(!alternate)
        }, 5000)
    }, [])

    return <>
        <h3 style={{ margin: '25px 0 0 0' }}>Static alert example</h3>
        <div
            style={{
                margin: '5px auto 30px auto',
                padding: '0 30px',
                width: '100%',
                border: '1px solid lightgrey',
                height: '65px',
                backgroundColor: 'white',
                fontSize: '12px',
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center'
            }}
        >
            <img
                src={logo}
                style={{
                    height: '60%',
                    left: '50px'
                }}
                alt=""
            />
            <div style={{
                fontSize: '13px',
                fontWeight: '700',
                width: '190px',
                display: 'flex',
                justifyContent: 'space-between'
            }}
            >
                <span
                    style={{ position: 'relative', marginLeft: '30px' }}
                >
                    Shopping Cart
                    <Tooltip
                        show={alternate}
                        hoverBackground="bg-[#3b0586]"
                        hoverColor="white"
                        textboxWidth="150px"
                        animation="bounce"
                        arrowAlign="start"
                        position="bottom center"
                        alert="rgb(51,22,236)"
                        static
                    >
                        <span>New Item added!</span>
                    </Tooltip>
                </span>
                <span>Contact</span>
            </div>
        </div>
    </>
}