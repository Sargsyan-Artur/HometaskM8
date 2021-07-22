const webdriver = require("selenium-webdriver");
const driver = new webdriver.Builder()
    .usingServer('http://localhost:4444/wd/hub')
    .withCapabilities(webdriver.Capabilities.chrome())
    .build();


async function test() {
    await driver.get("https://eli.am/");
    const filterIcon = await driver.findElement(webdriver.By.id("filter_icon"));
    await filterIcon.isDisplayed();
    await filterIcon.click();
    const filterContainer = await driver.findElement(By.id("filter-field-container"));
    await filterContainer.isDisplayed();
    const search = await driver.findElement(By.id("eli-nav-search"));
    await search.click();
    const searchInput = await driver.findElement(By.id("s"));
    await searchInput.sendKeys("լամպ\n");
    const itemLink = await driver.findElement(By.xpath("(//li[@class='product_cat'])[1]"));
    await itemLink.click();
    const itemName = await driver.findElement(By.className("product_title entry-title"));
    await itemName.isDisplayed();
    await search.click();
    await driver.manage().setTimeouts({implicit: 10000});
    await driver.findElement(By.id("s")).sendKeys("լամպ", Key.ENTER);
    await driver.executeScript("history.go(0)");
    await driver.executeScript("return document.title;")
    await driver.quit();
}
test()