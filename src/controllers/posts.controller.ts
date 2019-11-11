import { Request, Response } from 'express';
import { connect } from '../database';
import { Post } from '../interfaces/Post';

export async function getPosts(req: Request, res: Response) {
    const conn = await connect();
    await conn.query("Select * from posts", function (err: any, posts: any) {
        if (err) {
            console.log("error: ", err);
        }
        else {
            console.log(JSON.stringify(posts));
            res.json(posts);
        }
    });
}

export async function createPosts(req: Request, res: Response) {
    const newPost: Post = req.body;
    const conn = await connect();
    await conn.query("INSERT INTO posts set ?", newPost, function (err: any, posts1: any) {

        if (err) {
            console.log("error: ", err);
        }
        else {
            console.log(JSON.stringify(posts1.insertId));
            res.json({
                "message":"Post created",
                "post_id":posts1.insertId
            });
        }
    });
}

export async function getPost(req: Request, res: Response)
{
    const conn = await connect();
    await conn.query("Select * from posts where id = ? ", req.params.postId,function (err: any, posts: any) {
        if (err) {
            console.log("error: ", err);
        }
        else {
            console.log(JSON.stringify(posts));
            res.json(posts);
        }
    });
}

export async function deletePost(req: Request, res: Response)
{
    const conn = await connect();
    await conn.query("DELETE FROM posts WHERE id = ? ", req.params.postId,function (err: any, posts: any) {
        if (err) {
            console.log("error: ", err);
        }
        else {
            console.log(JSON.stringify(posts));
            res.json(posts);
        }
    });
}

export async function updatePost(req: Request, res: Response)
{
    const conn = await connect();
    const updatePost =  req.body;
    await conn.query("UPDATE posts SET ? WHERE id = ?", [updatePost, req.params.postId],function (err: any, posts: any) {
        if (err) {
            console.log("error: ", err);
        }
        else {
            console.log(JSON.stringify(posts));
            res.json(posts);
        }
    });
}
