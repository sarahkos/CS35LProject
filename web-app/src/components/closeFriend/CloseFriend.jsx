import "./closeFriend.css"

export default function CloseFriend({recipe}) {
  return (
    <li className="sidebarFriend">
        <img className="sidebarFriendImg" src={recipe.image} alt="" />
        <span className="sidebarFriendName">{recipe.title}</span>
    </li>
  );
}
