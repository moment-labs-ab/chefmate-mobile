import { View, Text, FlatList, Touchable, TouchableOpacity, ImageBackground, Image } from 'react-native'
import React, { useState } from 'react'
import * as Animatable from 'react-native-animatable'

const zoomIn = {
    0: {
        scale: 0.9
    },
    1: {
        scale: 1.1
    }
}

const zoomOut = {
    0: {
        scale: 1
    },
    1: {
        scale: 0.9
    }
}

type TrendingItemProps = {
    activeItem: string,
    item: {
        $id: string,
        video: string,
        thumbnail: string
    }
}

const TrendingItem = ({ activeItem, item }: TrendingItemProps) => {
    const [play, setplay] = useState(false);

    return (
        <Animatable.View className="mr-5" //animation={activeItem === item.$id ? zoomIn : zoomOut} duration={500}
        >
            <TouchableOpacity 
                className="relative justify-center items-center" 
                activeOpacity={0.7}
                onPress={() => setplay(true)}>
                <ImageBackground
                    source={{ uri: item.thumbnail }}
                    className="w-52 h-72 rounded-[35px] my-5 overflow-hidden shadow-lg shadow-black/40"
                    resizeMode='cover'
                />

                <Image
                    //source={icons.play}
                    className="w-12 h-12 absolute"
                    resizeMode='contain'
                />

            </TouchableOpacity>
        </Animatable.View>
    
    )
}

type TrendingProps = {
    posts?: {
        $id: string,
        video: string,
        thumbnail: string
    }[]
}

const Trending = ({ posts } : TrendingProps) => {
    //const [activeItem, setActiveItem] = useState(posts![1]);

    return (
        <FlatList
            data={posts}
            keyExtractor={(item) => item.$id}
            renderItem={(item) => (<Text>Test</Text>)}
            onViewableItemsChanged={({ viewableItems }) => {
                if (viewableItems.length > 0) {
                    //setActiveItem(viewableItems[0].item.$id);
                }
            }}
            viewabilityConfig={{ itemVisiblePercentThreshold: 70 }}
            contentOffset={{ x: 170, y: 0 }}
            horizontal
        />
    )
}

export default Trending