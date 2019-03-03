export interface ResponseSearchModel {
    has_more: boolean;
    items: [{
        answer_id: number;
        answer_count: number;
        creation_date: number;
        is_answered: boolean;
        last_activity_date: number;
        last_edit_date: number;
        link: string;
        owner: {
            display_name: string;
            link: string;
            profile_image: string;
            reputation: number;
            user_id: number;
            user_type: string;
        };
        question_id: number;
        score: number;
        tags: [string];
        title: string;
        view_count: number;
    }];
    quota_max: number;
    quota_remaining: number;
}
