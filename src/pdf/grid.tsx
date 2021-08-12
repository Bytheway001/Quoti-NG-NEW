import React from 'react';
import ReactPDF, {Page as PDFPage,View,Text,StyleSheet } from "@react-pdf/renderer";


const styles = StyleSheet.create({
    page:{
        padding:50
    },
    row:{
        flexDirection:"row",
       
    },
    col:{
        flexDirection:'column',
        justifyContent:'center',
        flex:1
    },
    text:{
       
        textAlign:'center',
        fontSize:11,
        padding:6,
        color:'white',
        height:30,
        justifyContent:'flex-end'
 
    }
})

export const Page:React.FC<ReactPDF.PageProps> = (props)=>{
    return(
        <PDFPage {...props} style={styles.page} />
    )
}

export const Row:React.FC<ReactPDF.ViewProps> = (props,children)=>{
    return(
        <View {...props} style={{...styles.row,...props.style}}/>

    )
}


export const Col:React.FC<ReactPDF.ViewProps> = (props,children)=>{
    return(
        <View {...props} style={{...styles.col,...props.style}}/>

    )
}

export const Cell:React.FC<ReactPDF.TextProps> = (props,children)=>{
    return (
        <Text {...props} style={{...styles.text,...props.style}}/>
    )
}
