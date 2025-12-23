import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { DiscussionPost } from "./entities/discussion_posts.entity";
import { DiscussionThread } from "./entities/discussion_threads.entity";
import { PostVote } from "./entities/post_votes.entity";

@Module({
  imports: [
    TypeOrmModule.forFeature([DiscussionPost, DiscussionThread, PostVote]),
  ],
})
export class DiscussionModule { }
