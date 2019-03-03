export interface ResponseAnswersModel {
    has_more: boolean;
    items: [{
        answer_id: number;
        creation_date: number;
        is_accepted: boolean;
        last_activity_date: number;
        owner: {
            accept_rate: number;
            display_name: string;
            link: string;
            profile_image: string;
            reputation: number;
            user_id: number;
            user_type: string;
        };
        question_id: number;
        score: number;
    }];
    quota_max: number;
    quota_remaining: number;
}
