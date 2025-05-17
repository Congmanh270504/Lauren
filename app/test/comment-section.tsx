"use client";

import { useState, useRef } from "react";
import { Avatar } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Heart, MessageCircle, Send, MoreHorizontal } from "lucide-react";
import { cn } from "@/lib/utils";

type Comment = {
  id: string;
  username: string;
  isVerified?: boolean;
  avatarUrl: string;
  content: string;
  likes: number;
  timeAgo: string;
  replies?: Comment[];
};

const initialComments: Comment[] = [
  {
    id: "1",
    username: "traghippp",
    avatarUrl: "/placeholder.svg?height=40&width=40",
    content: "trời ơi nó đẹp. mà nó đáng yêu. mà nó cơ bắp 😂",
    likes: 291,
    timeAgo: "1d",
    replies: [],
  },
  {
    id: "2",
    username: "rare1.official",
    avatarUrl: "/placeholder.svg?height=40&width=40",
    content: "Love from INDIA ɴɪɴɪɴɪɴɪɴɪɴɪɴɴ keep up the hard work MTP",
    likes: 278,
    timeAgo: "1d",
    replies: [
      {
        id: "2-1",
        username: "kartik1999_humor",
        avatarUrl: "/placeholder.svg?height=40&width=40",
        content:
          "@rare1.official Look how much support you are getting from India😊 #gladtohelp",
        likes: 5,
        timeAgo: "1d",
      },
    ],
  },
  {
    id: "3",
    username: "lareine.art",
    avatarUrl: "/placeholder.svg?height=40&width=40",
    content: "❤️ ❤️",
    likes: 3,
    timeAgo: "1d",
    replies: [],
  },
  {
    id: "4",
    username: "lareine.art",
    avatarUrl: "/placeholder.svg?height=40&width=40",
    content: "❤️ ❤️",
    likes: 3,
    timeAgo: "1d",
    replies: [],
  },
  {
    id: "5",
    username: "lareine.art",
    avatarUrl: "/placeholder.svg?height=40&width=40",
    content: "❤️ ❤️",
    likes: 3,
    timeAgo: "1d",
    replies: [],
  },
];

export function CommentSection() {
  const [comments, setComments] = useState<Comment[]>(initialComments);
  const [expandedComments, setExpandedComments] = useState<Set<string>>(
    new Set(["2"])
  );
  const [newComment, setNewComment] = useState("");
  const commentInputRef = useRef<HTMLInputElement>(null);

  const toggleReplies = (commentId: string) => {
    setExpandedComments((prev) => {
      const updated = new Set(prev);
      if (updated.has(commentId)) {
        updated.delete(commentId);
      } else {
        updated.add(commentId);
      }
      return updated;
    });
  };

  const focusCommentInput = () => {
    if (commentInputRef.current) {
      commentInputRef.current.focus();
    }
  };

  const handleAddComment = () => {
    if (newComment.trim()) {
      const comment: Comment = {
        id: `new-${Date.now()}`,
        username: "user",
        avatarUrl: "/placeholder.svg?height=40&width=40",
        content: newComment,
        likes: 0,
        timeAgo: "Just now",
        replies: [],
      };

      setComments([...comments, comment]);
      setNewComment("");
    }
  };

  return (
    <div className="flex flex-col">
      {/* Post header */}
      <div className="flex items-center p-4 border-b">
        <Avatar className="h-8 w-8 mr-2">
          <img src="/placeholder.svg?height=32&width=32" alt="Profile" />
        </Avatar>
        <div className="flex items-center">
          <span className="font-semibold">sontungmtp</span>
          <span className="ml-1 text-blue-500">•</span>
          <span className="ml-1 text-blue-500 font-medium">Follow</span>
        </div>
        <Button variant="ghost" size="icon" className="ml-auto">
          <MoreHorizontal className="h-5 w-5" />
        </Button>
      </div>

      {/* Comments section */}
      <div className="max-h-96 overflow-y-auto p-4">
        {comments.map((comment) => (
          <div key={comment.id} className="mb-4">
            <div className="flex">
              <Avatar className="h-8 w-8 mr-2 flex-shrink-0">
                <img
                  src={comment.avatarUrl || "/placeholder.svg"}
                  alt={comment.username}
                />
              </Avatar>
              <div className="flex-1">
                <div className="flex flex-col">
                  <div>
                    <span className="font-semibold">{comment.username}</span>{" "}
                    <span>{comment.content}</span>
                  </div>
                  <div className="flex items-center mt-1 text-xs text-gray-500">
                    <span>{comment.timeAgo}</span>
                    <span className="mx-1">•</span>
                    <span>{comment.likes} likes</span>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-auto py-0 px-2"
                    >
                      Reply
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-auto py-0 px-2"
                    >
                      See translation
                    </Button>
                  </div>
                </div>
              </div>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 flex-shrink-0"
              >
                <Heart className="h-4 w-4" />
              </Button>
            </div>

            {/* View/Hide replies button */}
            {comment.replies && comment.replies.length > 0 && (
              <Button
                variant="ghost"
                size="sm"
                className="ml-10 mt-1 text-gray-500 h-auto py-0 px-0"
                onClick={() => toggleReplies(comment.id)}
              >
                <div className="flex items-center">
                  <div className="w-6 border-t border-gray-300"></div>
                  <span className="ml-2">
                    {expandedComments.has(comment.id)
                      ? "Hide replies"
                      : `View replies (${comment.replies.length})`}
                  </span>
                </div>
              </Button>
            )}

            {/* Replies */}
            {expandedComments.has(comment.id) && comment.replies && (
              <div className="ml-10 mt-2">
                {comment.replies.map((reply) => (
                  <div key={reply.id} className="flex mb-3">
                    <Avatar className="h-8 w-8 mr-2 flex-shrink-0">
                      <img
                        src={reply.avatarUrl || "/placeholder.svg"}
                        alt={reply.username}
                      />
                    </Avatar>
                    <div className="flex-1">
                      <div className="flex flex-col">
                        <div>
                          <span className="font-semibold">
                            {reply.username}
                          </span>{" "}
                          <span>{reply.content}</span>
                        </div>
                        <div className="flex items-center mt-1 text-xs text-gray-500">
                          <span>{reply.timeAgo}</span>
                          <span className="mx-1">•</span>
                          <span>{reply.likes} likes</span>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-auto py-0 px-2"
                          >
                            Reply
                          </Button>
                        </div>
                      </div>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 flex-shrink-0"
                    >
                      <Heart className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Post actions */}
      <div className="absolute bottom-0 left-0 right-0 bg-white shadow-lg">
        <div className="p-4 border-t">
          <div className="flex items-center mb-3">
            <Button variant="ghost" size="icon">
              <Heart className="h-6 w-6" />
            </Button>
            <Button variant="ghost" size="icon" onClick={focusCommentInput}>
              <MessageCircle className="h-6 w-6" />
            </Button>
            <Button variant="ghost" size="icon">
              <Send className="h-6 w-6" />
            </Button>
            <Button variant="ghost" size="icon" className="ml-auto">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-6 w-6"
              >
                <path d="M19 21 5 21a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z" />
                <polyline points="17 21 17 13 7 13 7 21" />
                <polyline points="7 3 7 8 15 8" />
              </svg>
            </Button>
          </div>
          <div className="text-sm font-semibold mb-1">
            Liked by <span className="font-semibold">_ttruc.niiiii_</span> and{" "}
            <span className="font-semibold">236,806 others</span>
          </div>
          <div className="text-xs text-gray-500 mb-3">1 day ago</div>
        </div>

        {/* Add comment */}
        <div className="flex items-center p-4 border-t">
          <Avatar className="h-8 w-8 mr-2">
            <img src="/placeholder.svg?height=32&width=32" alt="Your profile" />
          </Avatar>
          <Input
            ref={commentInputRef}
            type="text"
            placeholder="Add a comment..."
            className="flex-1 border-none focus-visible:ring-0 focus-visible:ring-offset-0 px-0"
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleAddComment();
              }
            }}
          />
          <Button
            variant="ghost"
            size="sm"
            className={cn(
              "text-blue-500 font-semibold",
              !newComment.trim() && "opacity-50 cursor-not-allowed"
            )}
            disabled={!newComment.trim()}
            onClick={handleAddComment}
          >
            Post
          </Button>
        </div>
      </div>
    </div>
  );
}
