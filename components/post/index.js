import {Video} from 'expo-av'
import React, {forwardRef, useEffect, useImperativeHandle, useRef} from 'react'
import styles from './styles'
import PostSingleOverlay from "./overlay";

export const PostSingle = forwardRef(({item}, parentRef) => {
    const ref = useRef(null);

    useImperativeHandle(parentRef, () => ({
        play,
        unload,
        stop,
        changeStatus
    }))

    useEffect(() => {
        return () => unload();
    }, [])


    const play = async () => {
        console.log(item)
        if (ref.current == null) {
            return;
        }

        // if video is already playing return
        const status = await ref.current.getStatusAsync();
        if (status?.isPlaying) {
            return;
        }
        try {
            await ref.current.playAsync();
        } catch (e) {
            console.log(e)
        }
    }


    const stop = async () => {
        if (ref.current == null) {
            return;
        }

        // if video is already stopped return
        const status = await ref.current.getStatusAsync();
        if (!status?.isPlaying) {
            return;
        }
        try {
            await ref.current.stopAsync();
        } catch (e) {
            console.log(e)
        }
    }

    const changeStatus = async () => {
        if (ref.current == null) {
            return;
        }

        // if video is already stopped, play it
        const status = await ref.current.getStatusAsync();
        if (!status?.isPlaying) {
            return stop()
        } else {
            return play()
        }

    }


    const unload = async () => {
        if (ref.current == null) {
            return;
        }

        // if video is already stopped return
        try {
            await ref.current.unloadAsync();
        } catch (e) {
            console.log(e)
        }
    }

    return (
        <>
            <PostSingleOverlay post={item}/>
            <Video
                ref={ref}
                style={styles.container}
                resizeMode="cover"
                shouldPlay={false}
                isLooping
                useNativeControls
                ignoreSilentSwitch="ignore"
                source={{uri: item.mediaUrl}}
            />
        </>
    )
})

export default PostSingle