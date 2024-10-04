'use client'
import 'particles.js'
import { useEffect } from 'react'

export const OrbEffect = () => {
    useEffect(() => {
        // @ts-ignore
        window.particlesJS.load('particles-js', '/particles.json', function () {
            console.log('particles.js loaded - callback')
        })
    }, [])

    return (
        <div
            id="particles-js"
            className="absolute z-0"
            style={{ width: '100%', height: '100vh' }}
        />
    )
}
