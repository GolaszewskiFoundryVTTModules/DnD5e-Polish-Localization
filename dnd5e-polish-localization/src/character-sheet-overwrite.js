Hooks.on("renderActorSheet", injectCharacterCss);

function injectCharacterCss(app, html, data) 
{
    /*Debug template*/
    /*
    ui.notifications.info("Character css inject run");
    */

    // gets all children of html that are attributes
    var attributeFields = html.find(".attribute");
    
    attributeFields.each(function() 
    {
        if($(this).text().includes(game.i18n.localize("DND5E.HitDice")))
        {
            $(this)[0].classList.add("hit-dice");
        }
        else if($(this).text().includes(game.i18n.localize("DND5E.ArmorClass")))
        {
            $(this)[0].classList.add("armor-class");
        }
        else if($(this).text().includes(game.i18n.localize("DND5E.Speed")))
        {
            $(this)[0].classList.add("speed");
        }
        else if($(this).text().includes(game.i18n.localize("DND5E.Initiative")))
        {
            $(this)[0].classList.add("initiative");
        }
    });

    // sort skill list
    var skillList = html.find(".skills-list")[0];
    
    var sortedSkillList = skillList.cloneNode(false);

    // Add all skills to an array
    var skills = [];
    for(var i = skillList.childNodes.length; i--;)
    {
        if(skillList.childNodes[i].nodeName === 'LI')
        {
            skills.push(skillList.childNodes[i]);
        }
    }

    // Sort the skills by their names
    skills.sort(function(a, b)
    {
        return a.childNodes[5].innerText.localeCompare(b.childNodes[5].innerText)
    });

    // Add them into the sortedList in order
    for(var i = 0; i < skills.length; i++)
    {
        sortedSkillList.appendChild(skills[i]);
    }

    // replace the skillList in HTML
    skillList.parentNode.replaceChild(sortedSkillList, skillList);
}