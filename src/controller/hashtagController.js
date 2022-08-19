import { getHashtags, getHashtag } from '../repositories/hashtagRepository.js';
import urlMetadata from 'url-metadata';

export async function listHashtag(_req, res) {
    try {
        const hashtags = await getHashtags();
        return res.status(200).send(hashtags);

    } catch (err) {
        console.log(err);
        return res.sendStatus(500);
    }
}

export async function getSingleHashtag(req, res){
    const { userId } = res.locals;
    let { limit, offset } = req.query;
    limit = parseInt(limit);
    offset = parseInt(offset);
    if (isNaN(limit) || isNaN(offset) || limit < 0 || offset < 0) {
        return res.sendStatus(400);
    }

    const urlHashtag = '#' + req.params.hashtag;
    try {
        const singleHashtags = await getHashtag(limit, offset, userId, urlHashtag);
        for (const singleHashtag of singleHashtags) {
            try{
                singleHashtag.metadata = await urlMetadata(singleHashtag.link);
                }
                catch{
                    singleHashtag.metadata = {url:singleHashtag.link};
                    continue;
                }
        }

        
        return res.status(200).send(singleHashtags);

    } catch (err) {
        console.log(err);
        return res.sendStatus(500);
    }
}
