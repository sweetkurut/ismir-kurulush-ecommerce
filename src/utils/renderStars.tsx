import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";

export const renderStars = (popularityScore: string) => {
    const score = parseFloat(popularityScore); // превращаем "38.0" в 38
    const maxScore = 50; // максимальное значение рейтинга
    const starsCount = (score / maxScore) * 5; // конвертируем в 5 звезд

    const fullStars = Math.floor(starsCount);
    const hasHalfStar = starsCount - fullStars >= 0.5;
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

    const stars = [];

    // полные звезды
    for (let i = 0; i < fullStars; i++) {
        stars.push(<FaStar key={"full" + i} color="#FFD700" style={{ marginRight: 2 }} />);
    }

    // половина звезды
    if (hasHalfStar) {
        stars.push(<FaStarHalfAlt key="half" color="#FFD700" style={{ marginRight: 2 }} />);
    }

    // пустые звезды
    for (let i = 0; i < emptyStars; i++) {
        stars.push(<FaRegStar key={"empty" + i} color="#FFD700" style={{ marginRight: 2 }} />);
    }

    return stars;
};
