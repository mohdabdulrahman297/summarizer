export default function ProgressBar({
    sections,
    currentSection,
}: {
    sections: any[];
    currentSection: number;
}) {
    const totalSections = sections.length;
    const progress = ((currentSection + 1) / totalSections) * 100;

    return (
        <div className="w-full h-4 bg-gray-300 rounded-full overflow-hidden shadow-md">
            <div
                className="h-full bg-gradient-to-r from-blue-500 to-purple-500 transition-all duration-500 ease-in-out"
                style={{ width: `${progress}%` }}
            ></div>
        </div>
    );
}