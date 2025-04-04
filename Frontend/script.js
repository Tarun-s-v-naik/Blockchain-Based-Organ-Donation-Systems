<<<<<<< HEAD
document.addEventListener("DOMContentLoaded", () => {
    const members = document.querySelectorAll(".team-card");
    
    members.forEach(member => {
        member.addEventListener("mouseover", () => {
            member.style.boxShadow = "0px 5px 15px rgba(255, 255, 255, 0.3)";
        });

        member.addEventListener("mouseleave", () => {
            member.style.boxShadow = "none";
        });
    });
});
=======
document.addEventListener("DOMContentLoaded", () => {
    const members = document.querySelectorAll(".team-card");
    
    members.forEach(member => {
        member.addEventListener("mouseover", () => {
            member.style.boxShadow = "0px 5px 15px rgba(255, 255, 255, 0.3)";
        });

        member.addEventListener("mouseleave", () => {
            member.style.boxShadow = "none";
        });
    });
});
>>>>>>> 9ecaf24aa00b3bca0fae28a1d63d8e8add355f3a
