import { NativeStackNavigationProp } from "@react-navigation/native-stack";

export type RootStackParamList = {
    Home:undefined;
    News:undefined;
    SignIn:undefined
}

export type HomeScreenNavigationProp=NativeStackNavigationProp<RootStackParamList,'Home'>

export interface NewsData{
    author: string;
    content: string;
    description: string;
    publishedAt: string;
    title: string;
    source: {
        id:string;
        name:string;
    };
    url: string;
    urlToImage: string;
}