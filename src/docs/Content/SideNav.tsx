import React from 'react'

export const SideNav = () => <div className="sticky">
    <ul>
        <li><a href="#install">Installation</a></li>
        <li><a href="#basic">Basic Usage</a></li>
        <li><a href="#examples">Examples</a></li>
        <ul className="subUl">
            <li className="subList"><a href="#types">Types</a></li>
            <li className="subList"><a href="#animations">Animations</a></li>
            <li className="subList"><a href="#customization">Customization</a></li>
            <li className="subList"><a href="#positions">Positions</a></li>
        </ul>
        <li><a href="#advanced">Advanced Usage</a></li>
        <li><a href="#api">API</a></li>
    </ul>
</div>
