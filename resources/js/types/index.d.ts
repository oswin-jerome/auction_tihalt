export interface User {
    id: number;
    name: string;
    email: string;
    email_verified_at?: string;
}

export type PageProps<
    T extends Record<string, unknown> = Record<string, unknown>
> = T & {
    auth: {
        user: User;
    };
};

export interface Auction {
    id: number;
    product_name: string;
    product_description: string;
    product_image_url: null;
    starting_price: string;
    joining_fee: string;
    start_time: Date;
    end_time: Date;
    status: string;
    created_at: Date;
    updated_at: Date;
    my_bids: Bid[];
    bids: Bid[];
    highest_bid?: Bid;
    winner: User;
    winner_bid: Bid;
}

export interface Bid {
    id: number;
    user_id: number;
    auction_id: number;
    amount: number;
    created_at: Date;
    updated_at: Date;
    auction: Auction;
    status: string;
    user: User;
}

export interface User {
    id: number;
    name: string;
    email: string;
    role: string;
    email_verified_at: null;
    created_at: Date;
    updated_at: Date;
}

export interface AppLog {
    id: number;
    event: string;
    message: string;
    user_id: null;
    created_at: Date;
    updated_at: Date;
}
