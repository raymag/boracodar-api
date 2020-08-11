import Post from '../models/Post';

const get = async (req, res) => {
    try {
        const { id } = req.params;

        const post = await Post.findOne({_id:id});
        
        if (!post) {
            return res.status(404).json({});
        } else {
            return res.status(200).json(post);
        }
    } catch (error) {
        return res.status(500).json();
    }
};

const create = async (req, res) => {
    try {
        const { title, body, tags,  headerImage, isPublished} = req.body;
        const manager = req.session.manager;
        const author = manager._id;
        const publishDate = Date.now();
        const lastUpdate = Date.now();
        const post = await Post.create({
            title,
            body,
            headerImage,
            tags,
            author,
            isPublished,
            publishDate,
            lastUpdate
        });
        return res.status(200).json(post);            
    } catch (error) {
        return res.status(500).json();
    }
}

const update = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, body, tags,  headerImage, isPublished } = req.body;

        const post = await Post.findOne({_id:id});

        if (!post) {
            return res.status(404).json();
        } else {
            console.log(post.author);
            console.log(req.session.manager._id);
            console.log(req.session.manager._id == post.author);
            if (post.author == req.session.manager._id) {

                if (title) {
                    post.title = title;
                }
                if (body) {
                    post.body = body;
                }
                if (tags) {
                    post.tags = tags;
                }
                if (headerImage) {
                    post.headerImage = headerImage;
                }
                if (isPublished) {
                    post.isPublished = isPublished;
                }
                
                post.lastUpdate = Date.now();
                
                await post.save();
                return res.status(200).json(post);
            } else {
                return res.status(401).json();
            }
        }
            } catch (error) {
        return res.status(500).send();
    }
};

export default { create, get, update };