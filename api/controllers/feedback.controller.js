import Feedback from "../models/feedback.models.js";
import { errorhandler } from "../utils/error.js";

export const createFeedback = async (req, res, next) => {
    try {
        const feedback = await Feedback.create(req.body);
        return res.status(201).json(feedback);
    } catch (error) {
        next(error);
    }
};

export const deleteFeedback = async (req, res, next) => {
    const feedback = await Feedback.findById(req.params.id);

    if (!feedback) {
        return res.status(404).json({ message: "Feedback not found" });
    }

    if (req.user.userId !== feedback.userRef && req.user.userId !== req.user.userId ) {
        return next(errorhandler(401, "You are not authorized to delete this feedback"));
    }
    

    try {
        await Feedback.findByIdAndDelete(req.params.id);
        res.status(200).json('Feedback deleted successfully');
    } catch (error) {
        next(error);
    }
};

export const updateFeedback = async (req, res, next) => {
    const feedback = await Feedback.findById(req.params.id);
    if (!feedback) {
        return next(errorhandler(404, 'Feedback not found!'));
    }
    if (req.user.userId !== feedback.userRef ) {
        return next(errorhandler(401, "You are not authorized to delete this feedback"));
    }
    

    try {
        const updatedFeedback = await Feedback.findByIdAndUpdate(
            req.params.id,
            { ...req.body }, 
            { new: true }
        );
        res.status(200).json(updatedFeedback);
    } catch (error) {
        next(error);
    }
};

export const approvingFeedbacks = async (req, res, next) => {
    const feedback = await Feedback.findById(req.params.id);
    if (!feedback) {
        return next(errorhandler(404, 'Feedback not found!'));
    }

    try {
        const updatedFeedback = await Feedback.findByIdAndUpdate(
            req.params.id,
            { status: 'Approved' },
            { new: true }
        );
        res.status(200).json(updatedFeedback);
    } catch (error) {
        next(error);
    }
}


export const approvedFeedbacks = async (req, res, next) => {
    try {
        const feedback = await Feedback.find({ status: 'Approved' });
        return res.status(200).json(feedback);
    } catch (error) {
        next(error);
    }
};

export const GetFeedback = async (req, res, next) => {
    try {
        const feedback = await Feedback.findById(req.params.id);
        if (!feedback) {
            return next(errorhandler(404, "Feedback not found"));
        }
        return res.status(200).json(feedback);
    } catch (error) {
        next(error);
    }
}

export const GetFeedbackUid = async (req, res, next) => {
    try {
        const userRef =  req.params.id;
        console.log(userRef);
        const feedback = await Feedback.find({userRef}); 
        
        if (!feedback) {
            return next(errorhandler(404, "Feedback not found"));
        }
        return res.status(200).json(feedback);
    } catch (error) {
        next(error);
    }
};

export const GetAllFeedback = async (req, res, next) => {
    try {
        const feedbacks = await Feedback.find();
        return res.status(200).json(feedbacks);
    } catch (error) {
        next(error);
    }
};