import React from 'react';

export default function Testimonials() {
    const reviews = [
        {
            name: "Ananya Iyer",
            role: "Architect",
            comment: "The ambiance is just as rich as the espresso. My favorite corner to find creative inspiration.",
            rating: 5,
            image: "https://www.shutterstock.com/image-photo/testimonial-portrait-young-woman-mug-260nw-2351344175.jpg"
        },
        {
            name: "Rohan Malhotra",
            role: "Product Designer",
            comment: "Finally, a cafe that understands a perfect pour-over. Consistent quality and amazing staff.",
            rating: 5,
            image: "https://media.istockphoto.com/id/614640710/photo/relaxing-moments.jpg?s=612x612&w=0&k=20&c=AFjTUA9rqJIF3141ghVg7B_MwzaKZAW8WyOKcEe9QzY="
        },
        {
            name: "Meera Shah",
            role: "Freelancer",
            comment: "Fast WiFi, smooth lattes, and incredibly cozy. The perfect spot to stay productive all afternoon.",
            rating: 5,
            image: "https://www.shutterstock.com/image-photo/advertising-testimonial-photo-realistic-photography-260nw-2619865129.jpg"
        }
    ];

    return (
        <section className="py-20 bg-white">
            <div className="max-w-7xl mx-auto px-6">

                {/* Header - Spacing reduced with mb-10 */}
                <div className="text-center mb-10 space-y-2">
                    <p className="text-[#c48c5d] text-xs font-bold uppercase tracking-[0.4em]">Testimonials</p>
                    <h2 className="text-4xl md:text-5xl font-serif text-[#2a221e]">What Our Lovers Say</h2>
                </div>

                {/* Reviews Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {reviews.map((review, index) => (
                        <div
                            key={index}
                            className="group p-8 rounded-3xl bg-[#fdfaf7] border border-gray-100 hover:border-[#c48c5d]/30 hover:shadow-xl transition-all duration-500 flex flex-col justify-between"
                        >
                            <div>
                                {/* Rating Stars */}
                                <div className="flex gap-1 mb-4">
                                    {[...Array(review.rating)].map((_, i) => (
                                        <span key={i} className="text-[#c48c5d] text-sm">★</span>
                                    ))}
                                </div>

                                {/* Comment */}
                                <p className="text-[#2a221e] text-lg font-serif italic leading-relaxed mb-8">
                                    "{review.comment}"
                                </p>
                            </div>

                            {/* User Info */}
                            <div className="flex items-center gap-4 pt-6 border-t border-gray-200/50">
                                <div className="w-12 h-12 rounded-full bg-gray-200 overflow-hidden border-2 border-white shadow-sm">
                                    <img
                                        src={review.image}
                                        alt={review.name}
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                                <div>
                                    <h4 className="text-[#2a221e] font-bold text-sm">{review.name}</h4>
                                    <p className="text-[#c48c5d] text-[10px] uppercase tracking-widest font-semibold">{review.role}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}