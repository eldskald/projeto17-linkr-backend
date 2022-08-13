import { getHashtags, getHashtag } from '../repositories/hashtagRepository.js';
import urlMetadata from 'url-metadata';

export async function listHashtag(req, res) {
    try {
        const hashtags = await getHashtags();
        return res.status(200).send(hashtags);

    } catch (err) {
        return res.sendStatus(500);
    }
}

export async function getSingleHashtag(req, res){
    const urlHashtag = '#' + req.params.hashtag;
    try {
        const singleHashtags = await getHashtag(urlHashtag);
        for (const singleHashtag of singleHashtags) {
            singleHashtag.metadata = await urlMetadata(singleHashtag.link);
        }
        
        return res.status(200).send(singleHashtags);

    } catch (err) {
        return res.sendStatus(500);
    }
}