import * as React from 'react';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import {Grid} from "@mui/material";

function srcset(image: string, size: number, rows = 1, cols = 1) {
    return {
        src: `${image}?w=${size * cols}&h=${size * rows}&fit=crop&auto=format`,
        srcSet: `${image}?w=${size * cols}&h=${
            size * rows
        }&fit=crop&auto=format&dpr=2 2x`,
    };
}

export default function QuiltedImageList() {
    return (
        <span style={{width: "500px", height: "auto"}}>
        <Grid sx={{
        float: 'right',
        marginRight: '50px',
        marginLeft: '50px'}}>
        <ImageList
            sx={{ width: 700, height: 700}}
            variant="quilted"
            cols={5}
            rowHeight={225}
        >
            {itemData.map((item) => (
                <ImageListItem key={item.img} cols={item.cols || 1} rows={item.rows || 1}>
                    <img
                        {...srcset(item.img, 400, item.rows, item.cols)}
                        alt={item.title}
                    />
                </ImageListItem>
            ))}
        </ImageList>
        </Grid>
        </span>
    );
}

const itemData = [
    {
        img: 'https://images.unsplash.com/photo-1547153760-18fc86324498?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80',
        title: 'Dancing lady',
        rows: 3,
        cols: 3,
    },
    {
        img: 'https://images.unsplash.com/photo-1537365587684-f490102e1225?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1742&q=80',
        title: 'Dancing group',
        rows: 3,
        cols: 2,
    },

];
