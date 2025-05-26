// components/UserAvatar.jsx
import React from 'react'

export default function UserAvatar({ user, size = 64 }) {
    const avatarSize = `${size}px`

    // Extraire les initiales
    const getInitials = () => {
        const initials = [user?.surname, user?.name]
            .filter(Boolean)
            .map(n => n.trim()[0]?.toUpperCase())
            .join('')
        return initials || '?'
    }

    return (
        <div className="flex items-center space-x-4">
            {user?.picture_url ? (
                <img
                    src={user.picture_url}
                    alt={`Avatar de ${user.name}`}
                    className="object-cover border border-gray-300 rounded-full shadow"
                    style={{ width: avatarSize, height: avatarSize }}
                />
            ) : (
                <div
                    className="flex items-center justify-center font-bold text-white bg-blue-500 border rounded-full shadow"
                    style={{ width: avatarSize, height: avatarSize, fontSize: size / 2.5 }}
                >
                    {getInitials()}
                </div>
            )}

            <div>
                <p className="font-semibold text-gray-800">
                    {user?.surname} {user?.name}
                </p>
                <p className="text-sm text-gray-500">{user?.email}</p>
            </div>
        </div>
    )
}
