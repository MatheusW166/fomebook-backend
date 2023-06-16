export function mapPosts(posts) {
  return posts.map((post) => {
    post.userName = post.user.name;
    post.userPhoto = post.user.photo;
    post.likesCount = post._count.likes;
    delete post._count;
    delete post.user;
    return post;
  });
}
