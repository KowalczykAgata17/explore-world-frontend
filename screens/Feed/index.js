import {FlatList, View, TouchableWithoutFeedback} from "react-native";
import styles from './styles'
import React, {useEffect, useRef, useState} from "react";
import PostSingle from "../../components/post";
import {POSTS_ENDPOINT} from '@env'

export default function FeedScreen() {
    const [posts, setPosts] = useState([])
    const mediaRefs = useRef([])

    useEffect(() => {
        fetch('http://10.183.1.156:3004/posts',)
            .then(res => res.json())
            .then(obj => {
                    let result = []
                    for (const e of obj) {
                        result.push({
                            "id": e._id,
                            "content": e.content,
                            "likes": e.likes,
                            "location": e.location.name,
                            "mediaUrl": e.mediaUrl,
                        })
                    }
                    setPosts(result)
                console.log(posts)
                }
            )
            .catch(error => {
                console.error("Error: " + error);
            });
    }, [])


    const onViewableItemsChanged = useRef(({changed}) => {
        changed.forEach(element => {
            const cell = mediaRefs.current[element.key]
            if (cell) {
                if (element.isViewable) {
                    cell.play()
                } else {
                    cell.stop()
                }
            }
        });
    })

    const onPlayPausePress = useRef(({changed}) => {
        changed.forEach(element => {
            const cell = mediaRefs.current[element.key]
            console.log(cell)
            if (cell) {
                cell.changeStatus()
            }
        });
    })


    const renderItem = ({item, index}) => {
        return (
            <View style={styles.video_container}>
                <TouchableWithoutFeedback onPress={onPlayPausePress.current}>
                    <PostSingle item={item} ref={PostSingleRef => (mediaRefs.current[item.id] = PostSingleRef)}/>
                </TouchableWithoutFeedback>
            </View>
        )
    }


    return (
        <View style={styles.container}>
            <FlatList
                data={posts}
                windowSize={4}
                initialNumToRender={3}
                maxToRenderPerBatch={2}
                removeClippedSubviews
                viewabilityConfig={{
                    itemVisiblePercentThreshold: 100
                }}
                renderItem={renderItem}
                pagingEnabled
                keyExtractor={item => item.id}
                decelerationRate={'normal'}
                onViewableItemsChanged={onViewableItemsChanged.current}
            />
        </View>
    )
}
